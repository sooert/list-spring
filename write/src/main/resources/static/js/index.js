// 게시글 검색 기능
function searchPosts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#board-body tr');

    rows.forEach(row => {
        const title = row.cells[1].textContent.toLowerCase();
        if (title.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

$(document).ready(function() {
    // 페재 페이지 URL에서 카테고리 확인
    const currentPath = window.location.pathname;
    let category = 'ALL';
    
    if (currentPath.includes('/notice')) {
        category = '공지사항';
    } else if (currentPath.includes('/free')) {
        category = '자유게시판';
    } else if (currentPath.includes('/question')) {
        category = 'Q&A';
    }
    
    // 카테고리에 맞는 게시글 로드
    loadPosts(category);
});

function loadPosts(category) {
    $.ajax({
        url: "./api/board/list",
        type: "GET",
        success: function(boards) {
            console.log("게시글 데이터 요청 성공:", boards);
            
            let filteredBoards = boards;
            if (category !== 'ALL') {
                filteredBoards = boards.filter(board => board.category === category);
            }
            
            if (!filteredBoards || filteredBoards.length === 0) {
                console.log("게시글 데이터가 비어있음");
                $('#board-body').html('<tr><td colspan="5" style="text-align: center;">등록된 게시글이 없습니다.</td></tr>');
                return;
            }
            
            let html = '';
            filteredBoards.forEach(function(board, index) {
                html += `
                    <tr onclick="location.href='./detail?idx=${board.board_idx}'" style="cursor: pointer;">
                        <td>${index + 1}</td>
                        <td>${board.category}</td>
                        <td>${board.name}</td>
                        <td>${board.user_nick}</td>
                        <td>${board.created_date}</td>
                    </tr>
                `;
            });
            $('#board-body').html(html);
        },
        error: function(e) {
            console.error("게시글 목록 로드 실패:", e);
            $('#board-body').html('<tr><td colspan="5" style="text-align: center; color: red;">게시글 목록을 불러오는데 실패했습니다.</td></tr>');
        }
    });
}
