---
layout: basic-inside
permalink: /solutions/template.php
title: "<?= $course_name ?> solutions"
desc: "Solutions to all the assignments from the <?= $course_name ?> course. They are password protected and only available for teachers and TAs."
priority: 0.1
hide_markbot: true
hide_algonquin: true
hide_nav: true
head: |
  <link href="/css/main-topics.min.css" rel="stylesheet">
---

{% include icons-topics.html %}

<div class="wrapper gutter-1-2 pad-t pad-b-1-2">
  <?= $list ?>
</div>
