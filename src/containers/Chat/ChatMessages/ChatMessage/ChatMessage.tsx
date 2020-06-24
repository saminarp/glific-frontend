import React from 'react';
import moment from 'moment';
import { GeneralTooltip } from '../../../../components/UI/GeneralTooltip/GeneralTooltip';

import styles from './ChatMessage.module.css';

export interface ChatMessageProps {
  id: number;
  body: string;
  contactId: number;
  receiver: {
    id: number;
  };
  insertedAt: string;
}

export const ChatMessage: React.SFC<ChatMessageProps> = (props) => {
  let additionalClass = styles.Mine;

  if (props.receiver.id === props.contactId) {
    additionalClass = styles.Other;
  }

  return (
    <div className={[styles.ChatMessage, additionalClass].join(' ')}>
      <GeneralTooltip
        title={moment(props.insertedAt).format('MMM, DD YYYY')}
        placement="right"
        body={
          <div className={styles.Content} data-testid="content">
            {props.body}
          </div>
        }
      />
      <div className={styles.Date} data-testid="date">
        {moment(props.insertedAt).format('HH:mm')}
      </div>
    </div>
  );
};

export default ChatMessage;
