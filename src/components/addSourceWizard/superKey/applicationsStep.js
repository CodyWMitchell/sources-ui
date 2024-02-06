import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import { compileAllApplicationComboOptions } from '../compileAllApplicationComboOptions';

const applicationsStep = (applicationTypes, intl) => ({
  name: 'select_applications',
  title: intl.formatMessage({
    id: 'applications.select',
    defaultMessage: 'Select applications',
  }),
  nextStep: 'summary',
  fields: [
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'conf-desc',
      label: intl.formatMessage({
        id: 'applications.description',
        defaultMessage:
          // eslint-disable-next-line max-len
          'Configuring your cloud integrations provides additional capabilities included with your subscription. You can turn these features on or off at any time after integration creation.',
      }),
    },
    {
      component: 'switch-group',
      name: 'applications',
      label: intl.formatMessage({
        id: 'applications.availableApplications',
        defaultMessage: 'Available applications',
      }),
      options: compileAllApplicationComboOptions(applicationTypes, intl, undefined),
      applicationTypes,
    },
  ],
});

export default applicationsStep;
