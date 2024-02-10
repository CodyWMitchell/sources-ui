import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@data-driven-forms/pf4-component-mapper';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { SelectVariant } from '@patternfly/react-core/deprecated';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';

const SelectWithLink = (originalProps) => {

  const { label, input, isDisabled, options, linkTitle, href } = useFieldApi(originalProps);

  return (
    <div>
      <Select
        label={label}
        options={options}
        {...input}
        disabled={isDisabled}
        variant={SelectVariant.single}
        aria-label={label}
      />
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Text component={TextVariants.a}>
          <a>{linkTitle}</a>
        </Text>
      </a>
    </div>
  );
};

SelectWithLink.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  linkTitle: PropTypes.string,
};

SelectWithLink.defaultProps = {
  isDisabled: false,
  options: [],
  linkTitle: 'Learn more',
};

export default SelectWithLink;
