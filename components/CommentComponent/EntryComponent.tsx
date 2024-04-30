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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={commentText}
          onChangeText={(text) => setCommentText(text)}
          placeholder="Ecrire un commentaire..."
        />
        <TouchableOpacity style={styles.button} onPress={handleCommentSubmit}>
          <Text style={styles.buttonText}> Commenter </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "1%",
    padding: "1%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: "1%",
    flex: 1,
    marginRight: "1%",
  },
  button: {
    backgroundColor: "#a3b18a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EntryComponent;
