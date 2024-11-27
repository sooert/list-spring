$(document).ready(function() {
    // 글쓰기 버튼 처리 수정
    $('.write-button').click(function(e) {
        e.preventDefault(); // 기본 동작 중지
        location.href = './login';
    });

    // 초기 설정
    const countPerPage = 10;
    let currentCategory = 'ALL';
    
    // 현재 카테고리 확인 및 저장
    const currentPath = window.location.pathname;
    if (currentPath.includes('/notice')) {
        currentCategory = '공지사항';
    } else if (currentPath.includes('/free')) {
        currentCategory = '자유게시판';
    } else if (currentPath.includes('/question')) {
        currentCategory = 'Q&A';
    }

    // 페이지네이션 초기화 시 카테고리 전달
    initializePagination(currentCategory, countPerPage);
});

// 페이지네이션 초기화
function initializePagination(category, countPerPage) {
    $.ajax({
        url: "api/board/totalCount",
        method: "get",
        data: { category: category },
        success: function(totalCount) {
            $('#pagination-demo').twbsPagination({
                totalPages: Math.ceil(totalCount/countPerPage),
                visiblePages: 7,    
                first: '처음으로',
                last: '마지막으로',
                prev: '이전',
                next: '다음',
                onPageClick: function (event, page) {
                    const start = (page-1) * countPerPage;
                    loadPosts(category, start, countPerPage);
                }
            });
        }
    });
}

// 게시글 로드
function loadPosts(category, start, count) {
    $.ajax({
        url: "./api/board/list",
        type: "GET",
        data: {
            category: category,
            start: start,
            count: count
        },
        success: function(boards) {
            let filteredBoards = boards;
            // ALL이 아닌 경우에만 필터링
            if (category !== 'ALL') {
                filteredBoards = boards.filter(board => board.category === category);
            }
            
            if (!filteredBoards || filteredBoards.length === 0) {
                $('#board-container').html('<div class="no-posts">등록된 게시글이 없습니다.</div>');
                return;
            }
            
            let html = `
                <table class="board-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            filteredBoards.forEach(function(board, index) {
                html += `
                    <tr onclick="viewPost(${board.board_idx})" style="cursor: pointer;">
                        <td>${start + index + 1}</td>
                        <td>${board.category}</td>
                        <td>${board.name}</td>
                        <td>${board.user_nick}</td>
                        <td>${board.created_date}</td>
                        <td>${board.views}</td>
                    </tr>
                `;
            });
            
            html += '</tbody></table>';
            $('#board-container').html(html);
        },
        error: function(e) {
            console.error("게시글 목록 로드 실패:", e);
            $('#board-container').html('<div class="error-message">게시글 목록을 불러오는데 실패했습니다.</div>');
        }
    });
}

// 검색 기능 수정
function searchPosts() {
    const searchTerm = $('#searchInput').val();
    
    $.ajax({
        url: "./api/board/search",
        type: "GET",
        data: {
            searchTerm: searchTerm,
            category: currentCategory  // 현재 카테고리 전달
        },
        success: function(boards) {
            if (!boards || boards.length === 0) {
                $('#board-container').html('<div class="no-posts">검색 결과가 없습니다.</div>');
                return;
            }
            
            let html = `
                <table class="board-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            boards.forEach(function(board, index) {
                html += `
                    <tr onclick="viewPost(${board.board_idx})" style="cursor: pointer;">
                        <td>${index + 1}</td>
                        <td>${board.category}</td>
                        <td>${board.name}</td>
                        <td>${board.user_nick}</td>
                        <td>${board.created_date}</td>
                        <td>${board.views}</td>
                    </tr>
                `;
            });
            
            html += '</tbody></table>';
            $('#board-container').html(html);
        },
        error: function(e) {
            console.error("검색 실패:", e);
            $('#board-container').html('<div class="error-message">검색 중 오류가 발생했습니다.</div>');
        }
    });
}

// 게시글 조회
function viewPost(boardIdx) {
    window.location.href = `./detail?idx=${boardIdx}`;
}
