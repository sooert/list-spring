package com.my.write.entity;

public class Chat {
	public int chat_idx = 0;
	public int board_idx = 0;
	public String user_nick = null;
	public String chat = null;
	public String created_date = null;
	private int like_count = 0;
	private int is_liked;

	public int getChat_idx() {
		return chat_idx;
	}

	public void setChat_idx(int chat_idx) {
		this.chat_idx = chat_idx;
	}

	public int getBoard_idx() {
		return board_idx;
	}

	public void setBoard_idx(int board_idx) {
		this.board_idx = board_idx;
	}

	public String getUser_nick() {
		return user_nick;
	}

	public void setUser_nick(String user_nick) {
		this.user_nick = user_nick;
	}

	public String getChat() {
		return chat;
	}

	public void setChat(String chat) {
		this.chat = chat;
	}

	public String getCreated_date() {
		return created_date;
	}

	public void setCreated_date(String created_date) {
		this.created_date = created_date;
	}

	public int getLike_count() {
		return like_count;
	}

	public void setLike_count(int like_count) {
		this.like_count = like_count;
	}

	public int getIs_liked() {
		return is_liked;
	}

	public void setIs_liked(int is_liked) {
		this.is_liked = is_liked;
	}

}
