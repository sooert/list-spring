package com.my.write.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.write.dao.UserDao;
import com.my.write.entity.User;

@Service
public class UserService {

	@Autowired
	UserDao userDao;

	public int save(User user) {
		return userDao.save(user);
	}

	public User findByCode(String user_code) {
		return userDao.findByCode(user_code);
	}

	public User getById(String id) {
		return userDao.getById(id);
	}

	public User getByNick(String nick) {
		return userDao.getByNick(nick);
	}

    // 유저 검색
	public User getByIdAndPw(User user) {
		return userDao.getByIdAndPw(user);
	}
}
