### Filtering

#### Option 1

Filter job listings based on the categories using the HTML `data-` attribute. In this option, you'd use the hardcoded content that already exists in the [index.html](./index.html) file.

The categories are:

- Role: Frontend, Backend, Fullstack
- Level: Junior, Midweight, Senior
- Languages: Python, Ruby, JavaScript, HTML, CSS
- Tools: React, Sass, Vue, Django, RoR (Ruby on Rails)

So, if a job listing is for has the following categories `Frontend, Junior, JavaScript, React` your HTML data attributes would look like this `data-role="frontend" data-level="junior" data-languages="javascript" data-tools="react"`.

<!-- <div class="job--listing">
      <div class="job--listing__logo">
        <img src="./images/photosnap.svg" alt="logo">
      </div>
      <div class="job--listing__details">
        <div class="row">
          <div class="details--company">
            Photoshop
          </div>
          <div class="details--new">
            New
          </div>
          <div class="details--featured">
            Featured
          </div>
          <div class="details--highlight">

          </div>
        </div>
        <div class="row">
          <div class="details--position">
            Senior Frontend Developer
          </div>
        </div>
        <div class="row">
          <p class="details--description">
            1d ago <span>•</span>
            Full Time <span>•</span>
            USA Only
          </p>
        </div>
      </div>
      <div class="job--listing__tags">
        <button class="job--tag">
          Frontend
        </button>
        <button class="job--tag">
          Senior
        </button>
        <button class="job--tag">
          HTML
        </button>
        <button class="job--tag">
          CSS
        </button>
        <button class="job--tag">
          JS
        </button>
      </div>
    </div> -->
