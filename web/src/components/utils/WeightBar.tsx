import React, { useMemo } from 'react';

const colorChannelMixer = (colorChannelA: number, colorChannelB: number, amountToMix: number) => {
  let channelA = colorChannelA * amountToMix;
  let channelB = colorChannelB * (1 - amountToMix);
  return channelA + channelB;
};

const colorMixer = (rgbA: number[], rgbB: number[], amountToMix: number) => {
  let r = Math.round(colorChannelMixer(rgbA[0], rgbB[0], amountToMix));
  let g = Math.round(colorChannelMixer(rgbA[1], rgbB[1], amountToMix));
  let b = Math.round(colorChannelMixer(rgbA[2], rgbB[2], amountToMix));
  return `rgb(${r}, ${g}, ${b})`;
};

const COLORS = {
  primaryColor: [189, 36, 28],
  secondColor: [189, 36, 28],
  accentColor: [189, 36, 28],
};

const WeightBar: React.FC<{ percent: number; durability?: boolean }> = ({ percent, durability }) => {
  const color = useMemo(() => {
    return durability
      ? percent < 50
        ? colorMixer(COLORS.accentColor, COLORS.primaryColor, percent / 100)
        : colorMixer(COLORS.secondColor, COLORS.accentColor, percent / 100)
      : percent > 50
        ? colorMixer(COLORS.primaryColor, COLORS.accentColor, percent / 100)
        : colorMixer(COLORS.accentColor, COLORS.secondColor, percent / 50);
  }, [durability, percent]);

  if (durability) {
    // Solid bar for durability
    return (
      <div className="durability-bar" style={{ width: '100%', height: '3px', backgroundColor: '#333' }}>
        <div
          style={{
            width: `${percent}%`,
            backgroundColor: color,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    );
  }

  // Segmented bar for weight
  const segments = 20;
  const activeSegments = Math.round((percent / 100) * segments);

  return (
    <div className="weight-bar" style={{ display: 'flex', gap: '6px' }}>
      {[...Array(segments)].map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            backgroundColor: i < activeSegments ? color : '#333',
            transition: 'background 0.3s ease',
          }}
        />
      ))}
    </div>
  );
};

export default WeightBar;
