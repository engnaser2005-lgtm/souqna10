import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, fullName, accountType) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            account_type: accountType,
          },
        },
      })

      if (error) throw error

      // Create profile immediately (no email verification needed)
      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: email,
          username: fullName,
          account_type: accountType,
          created_at: new Date().toISOString(),
        })

        if (profileError) throw profileError
        
        toast.success('تم إنشاء الحساب بنجاح!')
        return { success: true, user: data.user }
      }
    } catch (error) {
      toast.error(error.message || 'حدث خطأ أثناء التسجيل')
      return { success: false, error }
    }
  }

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      toast.success('تم تسجيل الدخول بنجاح!')
      return { success: true, user: data.user }
    } catch (error) {
      toast.error(error.message || 'خطأ في البريد أو كلمة المرور')
      return { success: false, error }
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      return { success: true }
    } catch (error) {
      toast.error(error.message || 'حدث خطأ')
      return { success: false, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('تم تسجيل الخروج')
      return { success: true }
    } catch (error) {
      toast.error(error.message)
      return { success: false }
    }
  }

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isSeller: profile?.account_type === 'seller' || profile?.account_type === 'admin',
    isAdmin: profile?.account_type === 'admin',
    isBuyer: profile?.account_type === 'buyer' || profile?.account_type === 'seller' || profile?.account_type === 'admin',
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
