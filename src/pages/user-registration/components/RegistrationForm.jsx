import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    bio: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: ''
  });
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const calculatePasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (password?.length >= 12) score++;
    if (/[a-z]/?.test(password) && /[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^a-zA-Z0-9]/?.test(password)) score++;

    const strengthMap = {
      0: { label: '', color: '' },
      1: { label: 'Very Weak', color: 'text-error' },
      2: { label: 'Weak', color: 'text-warning' },
      3: { label: 'Fair', color: 'text-warning' },
      4: { label: 'Good', color: 'text-success' },
      5: { label: 'Strong', color: 'text-success' }
    };

    return { score, ...strengthMap?.[score] };
  };

  const checkUsernameAvailability = (username) => {
    if (!username || username?.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setIsCheckingUsername(true);
    
    const unavailableUsernames = ['admin', 'user', 'test', 'blogconnect', 'moderator'];
    
    setTimeout(() => {
      const isAvailable = !unavailableUsernames?.includes(username?.toLowerCase());
      setUsernameAvailable(isAvailable);
      setIsCheckingUsername(false);
    }, 800);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }

    if (name === 'username') {
      checkUsernameAvailability(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username) {
      newErrors.username = 'Username is required';
    } else if (formData?.username?.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/?.test(formData?.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    } else if (usernameAvailable === false) {
      newErrors.username = 'Username is already taken';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength?.score < 3) {
      newErrors.password = 'Please choose a stronger password';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/subscription-feed');
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
      <div className="space-y-5">
        <div className="relative">
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="Choose a unique username"
            value={formData?.username}
            onChange={handleChange}
            error={errors?.username}
            required
            description="3-20 characters, letters, numbers, and underscores only"
          />
          {isCheckingUsername && (
            <div className="absolute right-3 top-9 lg:top-10">
              <Icon name="Loader2" size={18} className="animate-spin text-muted-foreground" />
            </div>
          )}
          {usernameAvailable === true && !errors?.username && formData?.username && (
            <div className="absolute right-3 top-9 lg:top-10">
              <Icon name="CheckCircle2" size={18} color="var(--color-success)" />
            </div>
          )}
          {usernameAvailable === false && !errors?.username && (
            <div className="absolute right-3 top-9 lg:top-10">
              <Icon name="XCircle" size={18} color="var(--color-error)" />
            </div>
          )}
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={handleChange}
          error={errors?.email}
          required
          description="We'll send a verification email to this address"
        />

        <Input
          label="Display Name (Optional)"
          type="text"
          name="displayName"
          placeholder="How you want to appear to others"
          value={formData?.displayName}
          onChange={handleChange}
          description="This can be different from your username"
        />

        <div>
          <label htmlFor="bio" className="block text-sm font-medium font-caption text-foreground mb-2">
            Bio (Optional)
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            placeholder="Tell us a bit about yourself and what you write about..."
            value={formData?.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 lg:px-4 lg:py-2.5 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-editorial resize-none text-sm lg:text-base"
            maxLength="200"
          />
          <p className="mt-1.5 text-xs font-caption text-muted-foreground">
            {formData?.bio?.length}/200 characters
          </p>
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleChange}
            error={errors?.password}
            required
            description="At least 8 characters with mix of letters, numbers, and symbols"
          />
          {formData?.password && passwordStrength?.label && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength?.score === 1 ? 'bg-error w-1/5' :
                    passwordStrength?.score === 2 ? 'bg-warning w-2/5' :
                    passwordStrength?.score === 3 ? 'bg-warning w-3/5' :
                    passwordStrength?.score === 4 ? 'bg-success w-4/5': 'bg-success w-full'
                  }`}
                />
              </div>
              <span className={`text-xs font-caption font-medium ${passwordStrength?.color}`}>
                {passwordStrength?.label}
              </span>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={handleChange}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <div className="pt-2">
        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData?.agreeToTerms}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 lg:w-5 lg:h-5 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-editorial"
          />
          <span className="text-sm lg:text-base font-caption text-muted-foreground group-hover:text-foreground transition-editorial">
            I agree to the{' '}
            <a href="/terms" className="text-primary hover:text-primary/80 font-medium">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="/privacy" className="text-primary hover:text-primary/80 font-medium">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors?.agreeToTerms && (
          <p className="mt-1.5 text-xs lg:text-sm font-caption text-error">
            {errors?.agreeToTerms}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        iconName="UserPlus"
        iconPosition="left"
      >
        Create Account
      </Button>
    </form>
  );
};

export default RegistrationForm;