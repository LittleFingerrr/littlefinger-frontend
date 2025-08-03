import Image from 'next/image';

export const Logo = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <div className="flex items-center p-4">
        <div
            className={`
        flex items-center gap-0.5
        ${isCollapsed && 'justify-center'}
      `}
        >
            <Image src="/logo.svg" alt="logo" width={100} height={100} />
            <h2
                className={`
          text-base font-normal text-nowrap opacity-70 font-montserrat-subrayada text-white
         ${isCollapsed && 'hidden'}
        `}
            >
                LittleFinger
            </h2>
        </div>
    </div>
);
