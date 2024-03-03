import { minidenticon } from 'minidenticons';
import { useMemo } from 'react';

interface MinidenticonImgProps extends React.HTMLProps<HTMLImageElement>{
  username: string;
  saturation?: string;
  lightness?: string;
}

export const MinidenticonImg: React.FC<MinidenticonImgProps> = ({ username, saturation = '90', lightness = '50', ...props }) => {
  const svgURI = useMemo(
    () => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)),
    [username, saturation, lightness]
  );
  return <img src={svgURI} alt={username} {...props} />;
};