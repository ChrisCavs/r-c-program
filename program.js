'use strict';

async function loadProgram() {
  try {
    const response = await fetch('program.json');
    if (!response.ok) throw new Error(`Program request failed: ${response.status}`);
    const program = await response.json();
    for (const key of ['couple', 'occasion', 'thanks']) {
      if (typeof program[key] === 'string') document.getElementById(key).textContent = program[key];
    }
    document.getElementById('occasion').hidden = !program.occasion;
    document.title = `${program.couple || 'Our Wedding'} · The Program`;
    const welcome = document.getElementById('welcome');
    welcome.replaceChildren();
    for (const text of Array.isArray(program.welcome) ? program.welcome : [program.welcome]) {
      if (!text) continue;
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      welcome.append(paragraph);
    }
    const events = Array.isArray(program.events) ? program.events : [];
    const draft = document.getElementById('draft-message');
    draft.textContent = program.draftMessage || '';
    draft.hidden = !program.draftMessage;
    const picker = document.getElementById('section-picker');
    document.querySelector('.program-nav').hidden = events.length === 0;
    for (const [index, event] of events.entries()) {
      const item = document.createElement('li');
      const section = document.createElement('details');
      section.id = `section-${index + 1}`;
      const top = document.createElement('summary');
      top.className = 'event-top';
      const title = document.createElement('h3');
      title.textContent = event.title;
      top.append(title);
      if (event.time) {
        const time = document.createElement('span');
        time.className = 'event-time';
        time.textContent = event.time;
        top.append(time);
      }
      section.append(top);
      const paragraphs = event.paragraphs || (event.detail ? [event.detail] : []);
      for (const text of paragraphs) {
        const detail = document.createElement('p');
        detail.className = 'event-detail';
        detail.textContent = text;
        section.append(detail);
      }
      item.append(section);
      document.getElementById('events').append(item);
      const option = document.createElement('option');
      option.value = section.id;
      option.textContent = event.title;
      picker.append(option);
    }
    picker.addEventListener('change', () => {
      if (!picker.value) return;
      const section = document.getElementById(picker.value);
      section.open = true;
      section.scrollIntoView({ block: 'start' });
      section.querySelector('summary').focus({ preventScroll: true });
    });
    const toggle = document.getElementById('toggle-sections');
    const sections = [...document.querySelectorAll('#events details')];
    const updateToggle = () => {
      toggle.textContent = sections.every(section => section.open) ? 'Collapse all sections' : 'Expand all sections';
    };
    toggle.addEventListener('click', () => {
      const open = !sections.every(section => section.open);
      sections.forEach(section => { section.open = open; });
      updateToggle();
    });
    sections.forEach(section => section.addEventListener('toggle', updateToggle));
    const people = Array.isArray(program.people) ? program.people : [];
    for (const person of people) {
      const role = document.createElement('dt');
      role.textContent = person.role;
      const name = document.createElement('dd');
      name.textContent = person.name;
      document.getElementById('people').append(role, name);
    }
    document.getElementById('people-section').hidden = people.length === 0;
  } catch (error) {
    const message = document.getElementById('draft-message');
    message.hidden = false;
    message.textContent = 'The program could not be loaded. Please refresh the page in a moment.';
    console.error(error);
  }
}

loadProgram();
