// components/DisbursementCard.tsx
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DisbursementCardProps {
  title: string;
  mainText: string;
  subText: string;
  iconSrc: string;
  iconAlt: string;
  backgroundColor?: string;
}

const DisbursementCard: React.FC<DisbursementCardProps> = ({ 
  title, 
  mainText, 
  subText, 
  iconSrc, 
  iconAlt, 
  backgroundColor = "#1A1A1A"
}) => {
  return (
    <Card
      className="relative border-none rounded-xl p-6 overflow-hidden w-full"
      style={{ 
        backgroundColor,
        height: "188px"
      }}
    >
      {/* Glow effect - present on both cards */}
      <div
        className="absolute bottom-[-65px] right-14 w-32 h-32 rounded-3xl"
        style={{
          background: "radial-gradient(circle, #F3A42C 0%, transparent 70%)",
          filter: "blur(30px)",
          opacity: 0.7,
          zIndex: 1
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold text-white">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 flex items-center justify-start pl-4 space-x-6">
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={48}
            height={48}
            className="w-12 h-12"
          />
          <div className="flex flex-col">
            <p className="text-3xl font-extrabold font-lato text-white leading-tight mb-0">{mainText}</p>
            <p className="text-base font-normal mt-1" style={{ color: "#A0A0A0" }}>
              {subText}
            </p>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default DisbursementCard;