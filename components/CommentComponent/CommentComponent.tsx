import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";

import client from "../../client/client";
import { useUserContext } from "../../contexts/UserContext";

interface CommentComponentProps {
  hikeId: string;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ hikeId }) => {
  const { token, user } = useUserContext();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log("useEffect comment");
    if (!token) return;

    //todo get all comments with hikeid
    client.getAllCommentsByHike(token, hikeId);
  }, []);

  const handleCommentSubmit = () => {
    //todo create comment with text, userId & hikeId
  };

  return (
    <View>
      <TextInput
        value={commentText}
        onChangeText={setCommentText}
        placeholder="Write a comment..."
      />
      <Button title="Submit" onPress={handleCommentSubmit} />
    </View>
  );
};

export default CommentComponent;
