import clsx from 'clsx';

import { FieldWrapper } from './FieldWrapper';

export const ImageField = (props) => {
  const { type = 'file', label, className, registration, watching, value, error } = props;

  return (
    <FieldWrapper label={label} error={error}>
      {!watching || watching.length === 0 ? (
        <input type={type} className={clsx('', className)} value={value} {...registration} />
      ) : (
        <strong>{watching[0].name}</strong>
      )}
    </FieldWrapper>
  );
};
