import React, { useState } from 'react';
import { Typography, List, Toolbar, Container } from '@material-ui/core';
import styles from './ChatConversations.module.css';
import { SearchBar } from './SearchBar';
import selectedChatIcon from '../../../assets/images/icons/Chat/Selected.svg';
import ConversationList from './ConversationList/ConversationList';

export interface ChatConversationsProps {
  contactId: number;
}

export const ChatConversations: React.SFC<ChatConversationsProps> = (props) => {
  // get the conversations stored from the cache
  const [searchVal, setSearchVal] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(props.contactId);

  const handleChange = (event: any) => {
    setSearchVal(event.target.value);
  };

  // const resetSearch = () => {
  //   setSearchVal('');
  // };

  return (
    <Container className={styles.ChatConversations} disableGutters>
      <Toolbar className={styles.ToolBar}>
        <div className={styles.IconBackground}>
          <img src={selectedChatIcon} height="24" className={styles.Icon} alt="Conversation" />
        </div>
        <div className={styles.Title}>
          <Typography className={styles.TitleText} variant="h6">
            Chats
          </Typography>
        </div>
      </Toolbar>
      <SearchBar
        // handleSubmit={handleSearch}
        handleChange={handleChange}
        onReset={() => setSearchVal('')}
        searchVal={searchVal}
      />
      <ConversationList
        searchVal={searchVal}
        selectedContactId={selectedContactId}
        setSelectedContactId={(i: number) => {
          setSelectedContactId(i);
        }}
        // selectedContact={selectedIndex}
        // setSelectedIndex={(i: number) => {
        // setSelectedIndex(i);
        // }}
      />
    </Container>
  );
};

export default ChatConversations;
