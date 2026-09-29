import './ArchitecturalFrame.css';

interface ArchitecturalFrameProps {
  children: React.ReactNode;
  showCornerMarks?: boolean;
  showCoordinates?: boolean;
  coordinateLabel?: string;
  className?: string;
}

export default function ArchitecturalFrame({
  children,
  showCornerMarks = true,
  showCoordinates = false,
  coordinateLabel,
  className = '',
}: ArchitecturalFrameProps) {
  return (
    <div className={`arch-frame ${className}`}>
      {showCornerMarks && (
        <>
          <div className="arch-frame__corner arch-frame__corner--tl">
            <span className="arch-frame__tick arch-frame__tick--h"></span>
            <span className="arch-frame__tick arch-frame__tick--v"></span>
          </div>
          <div className="arch-frame__corner arch-frame__corner--tr">
            <span className="arch-frame__tick arch-frame__tick--h"></span>
            <span className="arch-frame__tick arch-frame__tick--v"></span>
          </div>
          <div className="arch-frame__corner arch-frame__corner--bl">
            <span className="arch-frame__tick arch-frame__tick--h"></span>
            <span className="arch-frame__tick arch-frame__tick--v"></span>
          </div>
          <div className="arch-frame__corner arch-frame__corner--br">
            <span className="arch-frame__tick arch-frame__tick--h"></span>
            <span className="arch-frame__tick arch-frame__tick--v"></span>
            {showCoordinates && coordinateLabel && (
              <span className="arch-frame__coord">{coordinateLabel}</span>
            )}
          </div>
        </>
      )}
      {children}
    </div>
  );
}
