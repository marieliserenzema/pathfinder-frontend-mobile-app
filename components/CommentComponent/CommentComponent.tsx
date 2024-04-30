import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRecoilValue } from "recoil";

import CommentsListAtom from "../../contexts/recoil/CommentsListAtom";

const CommentComponent: React.FC = () => {
  const comments = useRecoilValue(CommentsListAtom);

  return (
    <>
      {
        comments.length > 0
          ? comments.map((comment, index) => (
            <View style={styles.comment} key={index}>
              <Image
                style={styles.profilePicture}
                source={require("../../assets/avatar.png")}
              />
              <View style={styles.commentDetails}>
                <Text style={styles.username}>{comment.user.username}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))
          : <View style={styles.emptyContainer}>
            <Text>😌</Text>
            <Text>Aucun avis pour cette randonée</Text>
          </View>
      }
    </>

  );
};

const styles = StyleSheet.create({
  comment: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 2,
    marginVertical: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: "1%",
  },
  commentDetails: {
    display: "flex",
    flexDirection: "column",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  commentText: {
    fontSize: 14,
    marginTop: "1%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default CommentComponent;
