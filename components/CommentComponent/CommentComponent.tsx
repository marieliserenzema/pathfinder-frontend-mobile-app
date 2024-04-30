import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRecoilValue } from "recoil";

import CommentsListAtom from "../../contexts/recoil/CommentsListAtom";

const CommentComponent: React.FC = () => {
  const comments = useRecoilValue(CommentsListAtom);

  return (
    <View style={styles.container}>
      <View style={styles.commentsContainer}>
        <ScrollView>
          {comments
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
            : []}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "1%",
    elevation: 2,
    padding: "1%",
  },
  commentsContainer: {
    minHeight: 100,
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    marginTop: "1%",
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
  creationDate: {
    fontSize: 12,
    color: "#ccc",
  },
});

export default CommentComponent;
