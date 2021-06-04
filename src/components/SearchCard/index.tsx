import React, { ReactNode, FunctionComponent } from 'react';
import { Button, Card, Grid, Input, Link, Page, Spacer, Textarea } from '@geist-ui/react';

type Props = {
  title: string;
  placeholder: string;
  label?: string;
  large?: boolean;
  onSubmit: React.FormEventHandler<any> | undefined;
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  children?: ReactNode;
};

export const SearchCard: FunctionComponent<Props> = ({
  title,
  label,
  placeholder,
  large,
  onSubmit,
  onChange,
  children,
}) => {
  return (
    <Card shadow type="lite">
      <h4>{title}</h4>
      {label && (
        <Input label={label} placeholder={placeholder} onChange={onChange}>
          {children}
        </Input>
      )}
      {large && <Textarea width="100%" placeholder={placeholder}></Textarea>}
      <Spacer x={1} />
      <Button shadow type="secondary" auto onClick={onSubmit}>
        Search
      </Button>
      <Card.Footer>
        <Link color target="_blank" href="https://sauravmh.com">
          View raw data source.
        </Link>
      </Card.Footer>
    </Card>
  );
};
