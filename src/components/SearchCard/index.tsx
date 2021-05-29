import React, { ReactNode, FunctionComponent } from 'react';
import { Button, Card, Grid, Input, Link, Page, Spacer, Textarea } from '@geist-ui/react';

type Props = {
  title: string;
  placeholder: string;
  label?: string;
  large?: boolean;
  children?: ReactNode;
};

export const SearchCard: FunctionComponent<Props> = ({ title, label, placeholder, large, children }) => {
  return (
    <Card shadow type="lite">
      <h4>{title}</h4>
      {label && (
        <Input label={label} placeholder={placeholder}>
          {children}
        </Input>
      )}
      {large && <Textarea width="100%" placeholder={placeholder}></Textarea>}
      <Spacer x={1} />
      <Button shadow type="secondary" auto>
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
