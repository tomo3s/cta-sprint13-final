// Mock fetch
global.fetch = jest.fn();

// Import functions by evaluating the app.js content
const fs = require('fs');
const path = require('path');
const appCode = fs.readFileSync(path.join(__dirname, '../public/js/app.js'), 'utf8');

// Execute the app code to define functions
eval(appCode);

describe('Helper Functions', () => {
  describe('getStarRating', () => {
    test('returns 5 stars for rating 5', () => {
      expect(getStarRating(5)).toBe('★★★★★');
    });

    test('returns 3 filled and 2 empty stars for rating 3', () => {
      expect(getStarRating(3)).toBe('★★★☆☆');
    });

    test('returns 1 filled and 4 empty stars for rating 1', () => {
      expect(getStarRating(1)).toBe('★☆☆☆☆');
    });

    test('returns all empty stars for rating 0', () => {
      expect(getStarRating(0)).toBe('☆☆☆☆☆');
    });
  });

  describe('escapeHtml', () => {
    test('escapes HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
    });

    test('escapes ampersand', () => {
      expect(escapeHtml('foo & bar')).toBe('foo &amp; bar');
    });

    test('returns plain text unchanged', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });
  });

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const result = formatDate('2024-01-15T10:30:00Z');
      expect(result).toContain('2024');
      expect(result).toContain('1');
      expect(result).toContain('15');
    });
  });
});

describe('API Functions', () => {
  beforeEach(() => {
    fetch.mockClear();
    document.body.innerHTML = '<div id="reviews-list"></div>';
  });

  describe('loadReviews', () => {
    test('displays reviews when API returns data', async () => {
      const mockReviews = [
        {
          id: 1,
          title: 'Great Hotel',
          content: 'Very nice stay',
          author_name: 'John',
          rating: 5,
          created_at: '2024-01-15T10:30:00Z'
        }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockReviews)
      });

      await loadReviews();

      const container = document.getElementById('reviews-list');
      expect(container.innerHTML).toContain('Great Hotel');
      expect(container.innerHTML).toContain('John');
      expect(container.innerHTML).toContain('★★★★★');
    });

    test('displays empty message when no reviews', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([])
      });

      await loadReviews();

      const container = document.getElementById('reviews-list');
      expect(container.innerHTML).toContain('まだ口コミがありません');
    });

    test('displays error message on fetch failure', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await loadReviews();

      const container = document.getElementById('reviews-list');
      expect(container.innerHTML).toContain('口コミの読み込みに失敗しました');
    });
  });
});
