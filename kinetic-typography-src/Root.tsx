import React from 'react';
import { Composition } from 'remotion';
import { FivePoints } from './FivePoints';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="FivePoints"
      component={FivePoints}
      durationInFrames={144}
      fps={24}
      width={1920}
      height={1080}
    />
  );
};
