import { ComponentTemplate, AuthComponentType } from '../types/auth';

export const componentTemplates: ComponentTemplate[] = [
  {
    type: AuthComponentType.LOGIN_FORM,
    name: 'Login Form',
    description: 'Standard email/password login form',
    icon: 'LogIn',
    defaultConfig: {
      fields: ['email', 'password'],
      validation: true,
      rememberMe: true,
      forgotPassword: true
    }
  },
  {
    type: AuthComponentType.REGISTER_FORM,
    name: 'Registration Form',
    description: 'User registration with validation',
    icon: 'UserPlus',
    defaultConfig: {
      fields: ['email', 'password', 'confirmPassword'],
      validation: true,
      termsAcceptance: true,
      emailVerification: true
    }
  },
  {
    type: AuthComponentType.SOCIAL_AUTH,
    name: 'Social Authentication',
    description: 'OAuth login with social providers',
    icon: 'Users',
    defaultConfig: {
      providers: ['google', 'github'],
      buttonStyle: 'branded',
      allowRegistration: true
    }
  },
  {
    type: AuthComponentType.MFA,
    name: 'Multi-Factor Auth',
    description: 'Two-factor authentication step',
    icon: 'Shield',
    defaultConfig: {
      methods: ['totp', 'sms'],
      required: false,
      backupCodes: true
    }
  },
  {
    type: AuthComponentType.EMAIL_VERIFICATION,
    name: 'Email Verification',
    description: 'Send and verify email confirmation',
    icon: 'Mail',
    defaultConfig: {
      template: 'default',
      expiration: '24h',
      redirectUrl: '/dashboard'
    }
  },
  {
    type: AuthComponentType.PASSWORD_RESET,
    name: 'Password Reset',
    description: 'Forgot password flow',
    icon: 'Key',
    defaultConfig: {
      template: 'default',
      expiration: '1h',
      requireCurrentPassword: false
    }
  },
  {
    type: AuthComponentType.CONDITIONAL,
    name: 'Conditional Branch',
    description: 'Route based on conditions',
    icon: 'GitBranch',
    defaultConfig: {
      condition: 'user.isVerified',
      trueLabel: 'Verified',
      falseLabel: 'Unverified'
    }
  },
  {
    type: AuthComponentType.CUSTOM_SCRIPT,
    name: 'Custom Script',
    description: 'Execute custom authentication logic',
    icon: 'Code',
    defaultConfig: {
      script: '// Custom authentication logic\nreturn { success: true };',
      timeout: 5000
    }
  },
  {
    type: AuthComponentType.REDIRECT,
    name: 'Redirect',
    description: 'Navigate to URL or route',
    icon: 'ExternalLink',
    defaultConfig: {
      url: '/dashboard',
      external: false,
      delay: 0
    }
  }
];