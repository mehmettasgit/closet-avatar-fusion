import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TryOnButtonProps {
  onTryOn: () => void;
  disabled: boolean;
  loading: boolean;
}

export const TryOnButton: React.FC<TryOnButtonProps> = ({
  onTryOn,
  disabled,
  loading
}) => {
  return (
    <Button
      onClick={onTryOn}
      disabled={disabled}
      size="lg"
      className="px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:scale-105"
      aria-label={loading ? 'Processing try-on' : 'Start virtual try-on'}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Try On
        </>
      )}
    </Button>
  );
};