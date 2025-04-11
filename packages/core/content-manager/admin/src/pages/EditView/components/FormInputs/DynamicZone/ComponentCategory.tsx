import * as React from 'react';

import { Accordion, Box, Flex, FlexComponent, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';

import { ComponentIcon } from '../../../../../components/ComponentIcon';
import { RESPONSIVE_CONTAINER_BREAKPOINTS } from '../../FormLayout';

interface ComponentCategoryProps {
  category: string;
  components?: Array<{
    uid: string;
    displayName: string;
    icon?: string;
  }>;
  onAddComponent: (
    componentUid: string
  ) => React.MouseEventHandler<HTMLButtonElement> & React.MouseEventHandler<HTMLDivElement>;
  variant?: Accordion.Variant;
}

const ComponentCategory = ({
  category,
  components = [],
  variant = 'primary',
  onAddComponent,
}: ComponentCategoryProps) => {
  const { formatMessage } = useIntl();

  return (
    <Accordion.Item value={category}>
      <Accordion.Header variant={variant}>
        <Accordion.Trigger>
          {formatMessage({ id: category, defaultMessage: category })}
        </Accordion.Trigger>
      </Accordion.Header>
      <ResponsiveAccordionContent>
        <Grid paddingTop={4} paddingBottom={4} paddingLeft={3} paddingRight={3}>
          {components.map(({ uid, displayName, icon }, index) => {
            const images = [
              'https://i.postimg.cc/wxVxyTHt/Screenshot-2025-04-09-at-15-40-05.png',
              'https://i.postimg.cc/RVZSc5Vg/Screenshot-2025-04-09-at-15-41-22.png',
              'https://i.postimg.cc/65qK8rYS/Screenshot-2025-04-09-at-15-50-12.png',
              'https://i.postimg.cc/xTp05xXn/Screenshot-2025-04-09-at-15-43-37.png',
              'https://i.postimg.cc/zfK8Jq0G/Screenshot-2025-04-09-at-15-44-26.png',
              'https://i.postimg.cc/C140qmyy/Screenshot-2025-04-09-at-15-45-14.png',
              'https://i.postimg.cc/tTbyJ8Mt/Screenshot-2025-04-09-at-15-45-58.png',
            ];

            const image = images[index];
            return (
              <ComponentBox
                key={uid}
                tag="button"
                type="button"
                background="neutral100"
                justifyContent="center"
                onClick={onAddComponent(uid)}
                hasRadius
                height="8.4rem"
                shrink={0}
                borderColor="neutral200"
              >
                <Flex direction="column" gap={1} alignItems="center" justifyContent="center">
                  <Box
                    width={'120px'}
                    height={'120px'}
                    borderColor={'#dcdce4'}
                    display={'flex'}
                    marginBottom={2}
                  >
                    <Box as="img" src={image} width="120px" maxHeight={'120px'} />
                  </Box>

                  {/* <ComponentIcon color="currentColor" background="primary200" icon={image} /> */}
                  <Typography variant="pi" fontWeight="bold">
                    {displayName}
                  </Typography>
                </Flex>
              </ComponentBox>
            );
          })}
        </Grid>
      </ResponsiveAccordionContent>
    </Accordion.Item>
  );
};

const ResponsiveAccordionContent = styled(Accordion.Content)`
  container-type: inline-size;
`;

/**
 * TODO:
 * JSDOM cannot handle container queries.
 * This is a temporary workaround so that tests do not fail in the CI when jestdom throws an error
 * for failing to parse the stylesheet.
 */
const Grid =
  process.env.NODE_ENV !== 'test'
    ? styled(Box)`
        display: grid;
        grid-template-columns: repeat(auto-fill, 100%);
        grid-gap: 4px;

        @container (min-width: ${() => RESPONSIVE_CONTAINER_BREAKPOINTS.sm}) {
          grid-template-columns: repeat(auto-fill, 14rem);
        }
      `
    : styled(Box)`
        display: grid;
        grid-template-columns: repeat(auto-fill, 100%);
        grid-gap: 4px;
      `;

const ComponentBox = styled<FlexComponent<'button'>>(Flex)`
  color: ${({ theme }) => theme.colors.neutral600};
  height: 170px;
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    transition: color 120ms ${(props) => props.theme.motion.easings.easeOutQuad};
  }

  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    background: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
  }
`;

export { ComponentCategory };
export type { ComponentCategoryProps };
