import React, { useState } from 'react';
import moment from 'moment';

import styles from './Template.module.css';
import { List } from '../../List/List';
import { WhatsAppToJsx } from '../../../common/RichEditor';
import { DATE_TIME_FORMAT, setVariables } from '../../../common/constants';
import { GET_TEMPLATES_COUNT, FILTER_TEMPLATES } from '../../../graphql/queries/Template';
import { DELETE_TEMPLATE } from '../../../graphql/mutations/Template';
import { ReactComponent as DownArrow } from '../../../assets/images/icons/DownArrow.svg';

const getLabel = (label: string) => <div className={styles.LabelText}>{label}</div>;

const getBody = (text: string) => <p className={styles.TableText}>{WhatsAppToJsx(text)}</p>;

const getStatus = (text: string) => <p className={styles.TableText}>{text}</p>;

const getUpdatedAt = (date: string) => (
  <div className={styles.LastModified}>{moment(date).format(DATE_TIME_FORMAT)}</div>
);

const getTranslations = (id: string, language: any, data: string) => {
  const dataObj = JSON.parse(data);
  if (Object.prototype.hasOwnProperty.call(dataObj, language.id)) {
    delete dataObj[language.id];
  }
  return JSON.stringify(dataObj);
};

const queries = {
  countQuery: GET_TEMPLATES_COUNT,
  filterItemsQuery: FILTER_TEMPLATES,
  deleteItemQuery: DELETE_TEMPLATE,
};

const dialogMessage = 'It will stop showing when you draft a customized message';

export interface TemplateProps {
  title: string;
  listItem: string;
  listItemName: string;
  pageLink: string;
  listIcon: any;
  filters: any;
  buttonLabel: string;
  isHSM?: boolean;
}

export const Template: React.SFC<TemplateProps> = (props) => {
  const { title, listItem, listItemName, pageLink, listIcon, filters, buttonLabel, isHSM } = props;
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState('');

  let columnNames = ['LABEL', 'BODY'];
  columnNames = isHSM
    ? [...columnNames, 'STATUS', 'ACTIONS']
    : [...columnNames, 'LAST MODIFIED', 'ACTIONS'];

  let columnStyles: any = [styles.Label, styles.Body];

  columnStyles = isHSM
    ? [...columnStyles, styles.Status, styles.Actions]
    : [...columnStyles, styles.LastModified, styles.Actions];

  const getColumns = ({ id, language, label, body, updatedAt, translations, status }: any) => {
    const columns: any = {
      id,
      label: getLabel(label),
      body: getBody(body),
    };
    if (isHSM) {
      columns.status = getStatus(status);
    } else {
      columns.updatedAt = getUpdatedAt(updatedAt);
      columns.translations = getTranslations(id, language, translations);
    }
    return columns;
  };

  const columnAttributes = {
    columnNames,
    columns: getColumns,
    columnStyles,
  };

  const setDialog = (id: string) => {
    if (Id !== id) {
      setId(id);
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };

  const additionalAction = isHSM
    ? undefined
    : [
        {
          label: 'Show all languages',
          icon: <DownArrow />,
          parameter: 'id',
          dialog: setDialog,
        },
      ];

  return (
    <List
      title={title}
      listItem={listItem}
      listItemName={listItemName}
      pageLink={pageLink}
      listIcon={listIcon}
      additionalAction={additionalAction}
      dialogMessage={dialogMessage}
      filters={filters}
      refetchQueries={{
        query: FILTER_TEMPLATES,
        variables: setVariables({ term: '' }),
      }}
      button={{ show: true, label: buttonLabel }}
      {...columnAttributes}
      {...queries}
      collapseOpen={open}
      collapseRow={Id}
    />
  );
};

export default Template;
