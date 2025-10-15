import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e?.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Basic validation
    if (formData?.password !== formData?.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (formData?.password?.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const { error: authError } = await signUp(
        formData?.email, 
        formData?.password,
        {
          full_name: formData?.fullName,
          phone: formData?.phone,
          role: 'customer'
        }
      )
      
      if (authError) {
        setError(authError)
      } else {
        setSuccess('¡Registro exitoso! Revisa tu correo electrónico para verificar tu cuenta.')
        // Optionally redirect after successful registration
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (err) {
      setError('Error inesperado durante el registro. Por favor intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {success}
          </div>
        )}

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo *
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData?.fullName}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
            disabled={loading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData?.email}
            onChange={handleChange}
            placeholder="tu@ejemplo.com"
            required
            disabled={loading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData?.phone}
            onChange={handleChange}
            placeholder="+502 1234-5678"
            disabled={loading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña *
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData?.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            required
            disabled={loading}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña *
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData?.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
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
          {loading ? 'Registrando...' : 'Crear Cuenta'}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
}