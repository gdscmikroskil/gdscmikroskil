import * as React from 'react';

const startYear = 2023;
const currentYear = new Date().getFullYear();

export function Footer() {
  const yearToShow =
    startYear === currentYear ? startYear : `${startYear} - ${currentYear}`;

  return (
    <footer>
      <div className="mx-auto max-w-xl space-y-1 border-t px-3 py-4 text-center text-xs text-muted-foreground">
        <p>Copyright © {yearToShow}</p>
        <p>GDSC Universitas Mikroskil.</p>
      </div>
    </footer>
  );
}
