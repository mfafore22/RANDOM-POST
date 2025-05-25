├── App.js              # Main application component
├── App.css             # Basic styling
└── index.js            # Entry point


---

## 🧠 Components Overview

### `App`

**Responsibilities**:
- Manages global state: posts, form modes, and loading.
- Handles all business logic for creating, publishing, deleting, editing, and generating posts.
- Renders both the `ActivePost` form and the `PostItemView` list.

### `ActivePost`

**Props**:
- `activePost`: Object representing the currently active (editable) post.
- `onCreatePost`: Function to create a new blank post.
- `onGeneratePost`: Function to fetch a random post from the API.
- `onPublishPost`: Function to add/update the post to the list.
- `setActivePost`: Setter function to update the post being edited.

**Behavior**:
- If no active post, shows buttons to either **create** or **generate** a post.
- If editing/creating, shows a form pre-filled with post data.

### `PostItemView`

**Props**:
- `post`: The post object containing `id`, `url`, and `title`.
- `onEdit`: Function to set the post in editing mode.
- `onDeletePost`: Function to delete the post.

---

## 🔧 State Management

| State          | Description |
|----------------|-------------|
| `posts`        | List of all current posts. |
| `idCounter`    | Tracks the next available post ID. |
| `activePost`   | The post currently being edited or created. |
| `mode`         | Can be `"ADD"` or `"EDIT"` to determine form behavior. |
| `isLoading`    | Boolean that shows whether a random post is being fetched. |

---

## 🔌 External API

The app uses:

GET https://api.slingacademy.com/v1/sample-data/photos/:id
```

- Random id between 0–19 is chosen.
- Validated for image URL and title.
- On success, the image is added as a new post.

---

## 📸 Sample UI Actions

| Action              | Result                             |
|---------------------|------------------------------------|
| Click *Create Post* | Shows a form to add a new post.     |
| Click *Generate Random Post* | Fetches a photo from API and adds it. |
| Click *Edit* on a post | Loads it into the form for editing. |
| Click *Delete* | Removes the post from the list.     |

---

## ✅ Best Practices Followed

- Component-level props are cleanly structured.
- External API calls handled with async/await + error handling.
- Controlled inputs used in forms.
- UI feedback (LOADING state) shown during API calls.
- Clear and readable state updates with useState.

---

## 🧪 Future Improvements

- Add form validation feedback.
- Improve loading UX (e.g., spinner instead of text).
- Store posts in localStorage or integrate a backend.
- Add image preview for URL validation.