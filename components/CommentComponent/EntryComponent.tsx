import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useRecoilState } from "recoil";

import client from "../../client/client";
import { useUserContext } from "../../contexts/UserContext";
import commentsListAtom from "../../contexts/recoil/CommentsListAtom";
import CommentModel from "../../models/CommentModel";
import { AntDesign } from '@expo/vector-icons';


interface CommentComponentProps {
  hikeId: string;
}

const EntryComponent: React.FC<CommentComponentProps> = ({ hikeId }) => {
  const { token, user } = useUserContext();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useRecoilState(commentsListAtom);

  const handleCommentSubmit = () => {
    if (!token) return;
    if (!user) return;
    client
      .createComment(token, user._id, hikeId, commentText)
      .then((r: CommentModel) => {
        setCommentText("")
        setComments([r, ...comments]);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={commentText}
        onChangeText={(text) => setCommentText(text)}
        placeholder="Ecrire un avis..."
      />
      <View style={styles.iconContainer}>
        <AntDesign name="plus" size={20} color="white" onPress={handleCommentSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
  textInput: {
    flex: 1,
  },
  iconContainer: {
    padding: 5,
    backgroundColor: '#a3b18a',
    borderRadius: 15,
  },
});

export default EntryComponent;
