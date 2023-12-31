import {
  ActivityIcon,
  AlertCircleIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  Laptop2Icon,
  LinkIcon,
  LucideProps,
  MenuIcon,
  MoonIcon,
  QrCodeIcon,
  SunIcon,
  Undo2Icon,
} from 'lucide-react';

export const Icons = {
  Discord: ({
    color = 'currentColor',
    size = 24,
    strokeWidth = 0,
    absoluteStrokeWidth,
    ...props
  }: LucideProps) => {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke={color}
        strokeWidth={
          absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth
        }
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path
          d="M19.6849 4.88458C18.2517 4.21438 16.7193 3.7273 15.1172 3.44995C14.9205 3.8055 14.6906 4.28372 14.5321 4.66414C12.829 4.40815 11.1416 4.40815 9.4699 4.66414C9.31145 4.28372 9.07636 3.8055 8.87785 3.44995C7.27403 3.7273 5.73987 4.21617 4.3067 4.88813C1.416 9.25419 0.632383 13.5118 1.02419 17.709C2.94146 19.14 4.79952 20.0093 6.62622 20.5782C7.07724 19.9578 7.4795 19.2982 7.82603 18.6032C7.16605 18.3525 6.53393 18.0432 5.93665 17.6841C6.09511 17.5667 6.2501 17.4441 6.39984 17.3179C10.0428 19.0209 14.001 19.0209 17.6004 17.3179C17.7519 17.4441 17.9069 17.5667 18.0636 17.6841C17.4646 18.0449 16.8307 18.3543 16.1708 18.6049C16.5173 19.2982 16.9178 19.9596 17.3706 20.58C19.199 20.0111 21.0588 19.1418 22.9761 17.709C23.4358 12.8434 22.1907 8.62487 19.6849 4.88458ZM8.32233 15.1277C7.22875 15.1277 6.33192 14.1073 6.33192 12.8647C6.33192 11.6221 7.2096 10.5999 8.32233 10.5999C9.43509 10.5999 10.3319 11.6203 10.3127 12.8647C10.3145 14.1073 9.43509 15.1277 8.32233 15.1277ZM15.6779 15.1277C14.5844 15.1277 13.6875 14.1073 13.6875 12.8647C13.6875 11.6221 14.5652 10.5999 15.6779 10.5999C16.7907 10.5999 17.6875 11.6203 17.6684 12.8647C17.6684 14.1073 16.7907 15.1277 15.6779 15.1277Z"
          fill="inherit"
        />
      </svg>
    );
  },
  Alert: AlertCircleIcon,
  Link: LinkIcon,
  LightTheme: SunIcon,
  DarkTheme: MoonIcon,
  SystemTheme: Laptop2Icon,
  Undo: Undo2Icon,
  Check: CheckIcon,
  ChevronsUpDown: ChevronsUpDownIcon,
  Menu: MenuIcon,
  QRCode: QrCodeIcon,
  Studio: ActivityIcon,
};
