import { useMediaQuery } from "@mantine/hooks";

export const useResponsive = () => {
  const isSmall = useMediaQuery("(min-width: 370px) and (max-width: 767px)");
  const isMedium = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLarge = useMediaQuery("(min-width: 1024px) and (max-width: 1399px)");
  const isExtraLarge = useMediaQuery("(min-width: 1400px)");

  return {
    isSmall,
    isMedium,
    isLarge,
    isExtraLarge,
  };
};
