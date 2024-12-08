package com.my.write.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.my.write.entity.Admin;
@Repository
public class AdminDao {
	@Autowired
	SqlSession s;

	// admin 유저 저장
	public void save(Admin admin) {
		s.insert("admin.save", admin);
	}

}