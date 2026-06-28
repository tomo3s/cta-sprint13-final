const API_BASE_URL = 'https://api.hotel.tmr-lab.net/api/v1';

// Star rating display helper
function getStarRating(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Load reviews list
async function loadReviews() {
    const container = document.getElementById('reviews-list');

    try {
        const response = await fetch(`${API_BASE_URL}/reviews`);
        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const reviews = await response.json();

        if (reviews.length === 0) {
            container.innerHTML = '<p class="empty-message">まだ口コミがありません。最初の口コミを投稿してみましょう！</p>';
            return;
        }

        container.innerHTML = reviews.map(review => `
            <article class="review-card" onclick="location.href='detail.html?id=${review.id}'">
                <div class="review-card__header">
                    <h3 class="review-card__title">${escapeHtml(review.title)}</h3>
                    <span class="review-card__rating">${getStarRating(review.rating)}</span>
                </div>
                <p class="review-card__meta">
                    ${escapeHtml(review.author_name)} | ${formatDate(review.created_at)}
                </p>
                <p class="review-card__content">${escapeHtml(review.content)}</p>
            </article>
        `).join('');
    } catch (error) {
        console.error('Error loading reviews:', error);
        container.innerHTML = '<p class="error">口コミの読み込みに失敗しました</p>';
    }
}

// Load single review detail
async function loadReviewDetail(id) {
    const container = document.getElementById('review-content');

    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`);
        if (!response.ok) {
            throw new Error('Review not found');
        }

        const review = await response.json();

        container.innerHTML = `
            <h2 class="review-detail__title">${escapeHtml(review.title)}</h2>
            <div class="review-detail__rating">${getStarRating(review.rating)}</div>
            <p class="review-detail__meta">
                投稿者: ${escapeHtml(review.author_name)}<br>
                投稿日時: ${formatDate(review.created_at)}
            </p>
            <p class="review-detail__text">${escapeHtml(review.content)}</p>
        `;

        // Set up edit button
        document.getElementById('edit-btn').onclick = () => {
            window.location.href = `edit.html?id=${id}`;
        };

        // Set up delete button
        document.getElementById('delete-btn').onclick = () => {
            if (confirm('この口コミを削除しますか？')) {
                deleteReview(id);
            }
        };
    } catch (error) {
        console.error('Error loading review:', error);
        container.innerHTML = '<p class="error">口コミが見つかりません</p>';
    }
}

// Load review for editing
async function loadReviewForEdit(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`);
        if (!response.ok) {
            throw new Error('Review not found');
        }

        const review = await response.json();

        document.getElementById('review-id').value = review.id;
        document.getElementById('author_name').value = review.author_name;
        document.getElementById('title').value = review.title;
        document.getElementById('content').value = review.content;

        // Set rating
        const ratingInput = document.querySelector(`input[name="rating"][value="${review.rating}"]`);
        if (ratingInput) {
            ratingInput.checked = true;
        }
    } catch (error) {
        console.error('Error loading review:', error);
        alert('口コミの読み込みに失敗しました');
        window.location.href = 'index.html';
    }
}

// Handle create form submission
async function handleCreateSubmit(event) {
    event.preventDefault();

    const formData = {
        author_name: document.getElementById('author_name').value,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        rating: parseInt(document.querySelector('input[name="rating"]:checked').value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to create review');
        }

        alert('口コミを投稿しました！');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error creating review:', error);
        alert('口コミの投稿に失敗しました');
    }
}

// Handle edit form submission
async function handleEditSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('review-id').value;
    const formData = {
        author_name: document.getElementById('author_name').value,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
        rating: parseInt(document.querySelector('input[name="rating"]:checked').value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to update review');
        }

        alert('口コミを更新しました！');
        window.location.href = `detail.html?id=${id}`;
    } catch (error) {
        console.error('Error updating review:', error);
        alert('口コミの更新に失敗しました');
    }
}

// Delete review
async function deleteReview(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete review');
        }

        alert('口コミを削除しました');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error deleting review:', error);
        alert('口コミの削除に失敗しました');
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
