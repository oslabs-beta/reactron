import React from 'react';

export default function Blurb() {
  return (
    <div className='Blurb'>
      <h2 className='BlurbComponentlabel'>About</h2>
      <div className='Blurb-Container'>
        <p>
          <b>Far-Left:</b>
          <p>
            {' '}
            Select one of your individual components listed to the side. This
            will allow you to view it individually outside of your total app.
          </p>
        </p>
        <br />
        <p>
          <b>Top-Left:</b>
          <p>
            {' '}
            The rendered component of your choosing, regardless of state or
            props. Some rendered components will also carry with them
            functionality.
          </p>
        </p>
        <br />
        <p>
          <b>Bottom-Left:</b>
          <p>
            {' '}
            A full rendition of your total application so that you can inspect
            your progress macroscopically.
          </p>
        </p>
        <br />
        <p>
          <b>Bottom-Right:</b>
          <p>
            {' '}
            Component Fiber-Tree of you application, displaying each of your
            components and where they appear in reference to the total project.
            Click the Render button to see your tree update.
          </p>
        </p>
        <br />
      </div>
    </div>
  );
}
