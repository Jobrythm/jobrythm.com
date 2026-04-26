import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  whileHover = { scale: 1.02 },
  whileTap = { scale: 0.98 },
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-electric-500 text-white hover:bg-electric-600 focus:ring-electric-500 shadow-md hover:shadow-lg',
    secondary: 'bg-navy-800 text-white hover:bg-navy-900 focus:ring-navy-700 shadow-md hover:shadow-lg',
    outline: 'bg-transparent border-2 border-gray-300 text-gray-300 hover:bg-navy-700 focus:ring-navy-700',
    ghost: 'bg-transparent text-navy-700 hover:bg-navy-50 focus:ring-navy-500',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileHover={whileHover}
      whileTap={whileTap}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

Button.displayName = 'Button';

export default Button;
