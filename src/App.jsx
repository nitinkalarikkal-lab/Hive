import { useState } from "react";
import "./App.css";

const initialPosts = [
  {
    id: 1,
    category: "PROGRAMMING",
    title: "What's the best roadmap to master DSA?",
    body: "Starting my placement preparation. Which topics should I focus on first, and which platforms are worth using?",
    author: "Arjun",
    department: "MCA",
    time: "12 min ago",
    votes: 24,
    comments: 8,
  },
  {
    id: 2,
    category: "PROJECTS",
    title: "Building something beyond the usual college projects",
    body: "Looking for people who want to create unusual projects that solve real problems. Share your ideas below.",
    author: "Meera",
    department: "CSE",
    time: "35 min ago",
    votes: 18,
    comments: 12,
  },
  {
    id: 3,
    category: "CAMPUS LIFE",
    title: "Things every first-year student should know",
    body: "Let's collect the useful tips nobody tells you during orientation.",
    author: "Rahul",
    department: "IT",
    time: "1 hr ago",
    votes: 31,
    comments: 6,
  },
];

const categories = [
  "ALL",
  "PROGRAMMING",
  "ACADEMICS",
  "PROJECTS",
  "PLACEMENTS",
  "CAMPUS LIFE",
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "ALL" || post.category === activeCategory;

    const matchesSearch =
      `${post.title} ${post.body} ${post.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function createPost(event) {
    event.preventDefault();

    if (!title.trim() || !body.trim()) {
      setMessage("Add a title and some details first.");
      return;
    }

    const newPost = {
      id: Date.now(),
      category: activeCategory === "ALL" ? "ACADEMICS" : activeCategory,
      title: title.trim(),
      body: body.trim(),
      author: "You",
      department: "Student",
      time: "Just now",
      votes: 0,
      comments: 0,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setTitle("");
    setBody("");
    setMessage("Your discussion has been added!");
    setActiveCategory("ALL");
  }

  function votePost(id) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id ? { ...post, votes: post.votes + 1 } : post
      )
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-mark">h</span>
          <span>hive<span className="brand-dot">.</span></span>
        </a>

        <p className="sidebar-label">YOUR SPACE</p>

        <nav className="navigation">
          <a className="nav-item active" href="#feed">
            <span>◈</span> Home feed
          </a>
          <a className="nav-item" href="#composer">
            <span>＋</span> Start a discussion
          </a>
          <a className="nav-item" href="#categories">
            <span>▦</span> Communities
          </a>
        </nav>

        <p className="sidebar-label">EXPLORE TOPICS</p>

        <div className="sidebar-topics">
          {categories.slice(1).map((category) => (
            <button
              key={category}
              className={`topic-link ${
                activeCategory === category ? "selected" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="topic-dot" />
              {category}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">Y</div>
          <div>
            <strong>Your profile</strong>
            <p>Campus explorer</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="feed">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR CAMPUS. YOUR COMMUNITY.</p>
            <h1>The hive mind<span>.</span></h1>
          </div>
          <div className="topbar-badge">
            <span className="online-dot" /> COMMUNITY SPACE
          </div>
        </header>

        <section className="welcome-panel">
          <div className="welcome-copy">
            <span className="mini-tag">A BETTER CAMPUS STARTS HERE</span>
            <h2>Good ideas don't<br />grow in isolation.</h2>
            <p>
              Ask questions, share what you know, and find your people.
              This is your corner of campus.
            </p>
            <a href="#composer" className="primary-button">
              Start something <span>↗</span>
            </a>
          </div>

          <div className="hive-art" aria-hidden="true">
            <div className="hex hex-one">?</div>
            <div className="hex hex-two">✳</div>
            <div className="hex hex-three">↗</div>
            <div className="hex hex-four">✦</div>
            <div className="hex hex-center">h</div>
          </div>
        </section>

        <section className="composer" id="composer">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PUT IT OUT THERE</p>
              <h2>Start a discussion</h2>
            </div>
            <span className="section-icon">✳</span>
          </div>

          <form onSubmit={createPost}>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your discussion a clear title..."
              aria-label="Discussion title"
              maxLength={160}
            />

            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="What's on your mind? Share an idea, ask a question..."
              aria-label="Discussion details"
              rows={3}
              maxLength={3000}
            />

            <div className="composer-footer">
              <span>Be curious. Be kind. Be constructive.</span>
              <button className="primary-button" type="submit">
                Publish discussion ↗
              </button>
            </div>

            {message && <p className="status-message">{message}</p>}
          </form>
        </section>

        <section className="feed-section">
          <div className="feed-heading">
            <div>
              <p className="eyebrow">WHAT'S HAPPENING</p>
              <h2>Campus conversations</h2>
            </div>

            <span className="post-count">
              {filteredPosts.length} DISCUSSIONS
            </span>
          </div>

          <input
            className="search-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="⌕  Search discussions..."
            aria-label="Search discussions"
          />

          <div className="category-filters" id="categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-chip ${
                  activeCategory === category ? "chosen" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="post-list">
            {filteredPosts.map((post) => (
              <article className="post-card" key={post.id}>
                <div className="post-votes">
                  <button
                    aria-label={`Upvote ${post.title}`}
                    onClick={() => votePost(post.id)}
                  >
                    ↑
                  </button>
                  <strong>{post.votes}</strong>
                  <span>VOTES</span>
                </div>

                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span>·</span>
                    <span>{post.time}</span>
                  </div>

                  <h3>{post.title}</h3>
                  <p className="post-body">{post.body}</p>

                  <div className="post-footer">
                    <div className="author-info">
                      <span className="author-avatar">
                        {post.author[0]}
                      </span>
                      <span>
                        <strong>{post.author}</strong>
                        <small>{post.department}</small>
                      </span>
                    </div>

                    <span className="comment-count">
                      ◷ {post.comments} comments
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="empty-state">
                <span>⌕</span>
                <h3>No discussions found</h3>
                <p>Try another keyword or explore a different topic.</p>
              </div>
            )}
          </div>
        </section>

        <footer className="page-footer">
          <span>HIVE © 2026</span>
          <span>BUILT FOR THE CURIOUS.</span>
        </footer>
      </main>

      <aside className="right-panel">
        <div className="campus-card">
          <p className="eyebrow">THE HIVE PHILOSOPHY</p>
          <div className="philosophy-symbol">✳</div>
          <h3>Better together.</h3>
          <p>
            One question can start a conversation.
            One conversation can change everything.
          </p>
        </div>

        <div className="trending-panel">
          <p className="eyebrow">COMMUNITY GUIDELINES</p>
          {[
            ["01", "Ask without hesitation"],
            ["02", "Share what you learn"],
            ["03", "Respect different views"],
          ].map(([number, text]) => (
            <div className="guideline" key={number}>
              <span>{number}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="right-note">
          <span className="online-dot" />
          YOUR NEXT IDEA BELONGS HERE.
        </div>
      </aside>
    </div>
  );
}

export default App;