import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDemoCredentials, setShowDemoCredentials] = useState(true)
  
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: authError } = await signIn(email, password)
      
      if (authError) {
        setError(authError)
      } else {
        // Redirect to dashboard or previous page
        navigate('/user-dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError('')
    setLoading(true)

    try {
      const { error: authError } = await signIn(demoEmail, demoPassword)
      
      if (authError) {
        setError(authError)
      } else {
        navigate('/user-dashboard')
      }
    } catch (err) {
      setError('Failed to sign in with demo credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Demo Credentials Section */}
      {showDemoCredentials && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-800">
              Credenciales de Demostración
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDemoCredentials(false)}
              className="text-blue-600 hover:text-blue-800 p-1"
            >
              ✕
            </Button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-700">
                <strong>Admin:</strong> admin@labodegona.com
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('admin@labodegona.com', 'Admin123!')}
                disabled={loading}
                className="text-xs px-2 py-1 ml-2"
              >
                Usar
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-700">
                <strong>Gerente:</strong> gerente@labodegona.com
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('gerente@labodegona.com', 'Gerente123!')}
                disabled={loading}
                className="text-xs px-2 py-1 ml-2"
              >
                Usar
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-700">
                <strong>Cliente:</strong> cliente@labodegona.com
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('cliente@labodegona.com', 'Cliente123!')}
                disabled={loading}
                className="text-xs px-2 py-1 ml-2"
              >
                Usar
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-blue-700">
                <strong>Usuario:</strong> juan@labodegona.com
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('juan@labodegona.com', 'Juan123!')}
                disabled={loading}
                className="text-xs px-2 py-1 ml-2"
              >
                Usar
              </Button>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            placeholder="tu@ejemplo.com"
            required
            disabled={loading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
            placeholder="Tu contraseña"
            required
            disabled={loading}
            className="w-full"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}