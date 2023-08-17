import * as React from 'react';

interface CardRootProps {
  children?: React.ReactNode;
}

export function CardRoot({ children }: CardRootProps) {
  return <ul className="space-y-3">{children}</ul>;
}
