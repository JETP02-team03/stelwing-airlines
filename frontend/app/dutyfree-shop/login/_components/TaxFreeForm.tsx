import { LoginForm } from './LoginForm';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TaxFreeForm() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2">
        <LoginForm />
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <ImageWithFallback
          src="/placeholder-airplane.jpg"
          alt="Airplane wing over water"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
