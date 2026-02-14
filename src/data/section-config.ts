import { Section } from "./section-order";

export interface SectionConfig {
  isCollapsed: boolean;
  visibleItemsWhenCollapsed: number;
}

export const sectionConfig: Record<Section, SectionConfig> = {
  [Section.News]: {
    isCollapsed: true,
    visibleItemsWhenCollapsed: 2,
  },
  [Section.Publication]: {
    isCollapsed: true,
    visibleItemsWhenCollapsed: 5,
  },
  [Section.Experience]: {
    isCollapsed: false,
    visibleItemsWhenCollapsed: 2,
  },
  [Section.Education]: {
    isCollapsed: true,
    visibleItemsWhenCollapsed: 2,
  },
  [Section.Portfolio]: {
    isCollapsed: true,
    visibleItemsWhenCollapsed: 1,
  },
};
