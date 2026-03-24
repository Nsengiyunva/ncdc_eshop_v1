import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

export const Form = ({ onSubmit, children, className, options, id, schema, encType, ...rest }) => {
  const methods = useForm({ ...options, resolver: schema && zodResolver(schema) });
  return (
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      encType={encType}
      id={id}
      {...rest}
    >
      {children(methods)}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.shape({}),
  id: PropTypes.string,
  schema: PropTypes.shape({}),
};
