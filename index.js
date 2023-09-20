try {
    const Portfolio = class {
        constructor(){
            this.skillsList = document.querySelector('.skills__list_container');
            this.hobbiesList = document.querySelector('.folio_persona_hobbies');
            this.experieceList = document.querySelector('.folio_person_experiences');
            this.projectsList = document.querySelector('.projects_list_container');
        }

        renderSkillsList = (userSkills) => {
            userSkills.forEach((skill) => {
                const li = document.createElement('li');
                li.classList.add('skills__list_item');

                const skillTitle = document.createElement('span');
                skillTitle.classList.add('skill_name');
                skillTitle.textContent = skill.title;

                const skillBarBase = document.createElement('div');
                const skillBarScale = document.createElement('div');
                
                skillBarBase.classList.add('skill_scale_base');
                skillBarBase.style.overflow = 'hidden';
                skillBarScale.classList.add('skill_scale', 'animate__animated', 'animate__slideInLeft');

                skillBarScale.style.width = `${skill.value}%`;
                skillBarBase.appendChild(skillBarScale);

                li.appendChild(skillTitle);
                li.appendChild(skillBarBase);

                this.skillsList.appendChild(li);
            });
        }

        renderHobbies = (userHobbies) => {
            userHobbies.forEach((hobby) => {
                const hobbyCard = document.createElement('div');
                hobbyCard.classList.add('hobby_card');

                const figure = document.createElement('figure');
                figure.classList.add('folio_hobby', 'animate__animated', 'animate__fadeIn');
                const figureImage = document.createElement('img');
                figureImage.src = hobby.image;
                figure.appendChild(figureImage)

                const hobbyTitle = document.createElement('span');
                hobbyTitle.classList.add('hobby_name');
                hobbyTitle.textContent = hobby.title;

                const hobbyDescription = document.createElement('span');
                hobbyDescription.classList.add('hobby_desc');
                hobbyDescription.textContent = hobby.text;

                hobbyCard.appendChild(figure);
                hobbyCard.appendChild(hobbyTitle);
                hobbyCard.appendChild(hobbyDescription);

                this.hobbiesList.appendChild(hobbyCard);
            })
        }

        renderExperience = (userExperiences) => {
            userExperiences.forEach((experience) => {
                const experienceCard = document.createElement('div');
                experienceCard.classList.add('experience_card');

                const figure = document.createElement('figure');
                figure.classList.add('folio_exp_logo', 'animate__animated', 'animate__fadeIn');
                const figureImage = document.createElement('img');
                figureImage.src = experience.logo;
                figure.appendChild(figureImage)

                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('d-flex', 'flex-column');
                detailsDiv.style.rowGap = '12px';
                detailsDiv.style.flex = 1;

                const timeline = document.createElement('span');
                timeline.classList.add('exp_timeline');
                timeline.textContent = experience.timeline;

                const role = document.createElement('span');
                role.classList.add('exp_title');
                role.textContent = experience.role;

                const description = document.createElement('p');
                description.classList.add('exp_desc');
                description.textContent = experience.work;

                detailsDiv.appendChild(timeline);
                detailsDiv.appendChild(role);
                detailsDiv.appendChild(description);

                experienceCard.appendChild(figure);
                experienceCard.appendChild(detailsDiv);

                this.experieceList.appendChild(experienceCard);
            })
        }

        renderProjects = (projects) => {
            projects.forEach((project) => {
                const li = document.createElement('li');
                li.classList.add('project_list_item', 'section__card');

                const figure = document.createElement('figure');
                figure.classList.add('folio_project_avatar', 'animate__animated', 'animate__fadeIn');
                const figureImage = document.createElement('img');
                figureImage.src = project.banner;
                figure.appendChild(figureImage)

                const tags = document.createElement('span');
                tags.classList.add('project_stacks');

                project.tags.forEach((tag) => {
                    const tagItem = document.createElement('span');
                    tagItem.textContent = `#${tag}`;
                    tags.appendChild(tagItem);
                })

                const title = document.createElement('h2');
                title.classList.add('project_title');
                title.textContent = project.name;

                const description = document.createElement('p');
                description.classList.add('project_description');
                description.textContent = project.description;

                const ctaContainer = document.createElement('div');
                ctaContainer.classList.add('d-flex', 'justify-content-center');
                ctaContainer.style.columnGap = '12px';

                const demoLink = document.createElement('a');
                demoLink.textContent = 'Demo';
                demoLink.classList.add('button_cta', 'button-demo');
                demoLink.href = project.demo_link;
                demoLink.target = '_blank';

                const codeLink = document.createElement('a');
                codeLink.textContent = 'Code';
                codeLink.classList.add('button_cta', 'button-code');
                codeLink.href = project.code_link;
                codeLink.target = '_blank';

                ctaContainer.appendChild(demoLink);
                ctaContainer.appendChild(codeLink);

                li.appendChild(figure);
                li.appendChild(tags);
                li.appendChild(title);
                li.appendChild(description);
                li.appendChild(ctaContainer);

                this.projectsList.appendChild(li);
            })
        }

        async fetchData(){
            const res = await fetch('./data.json');
            const response = await res.json();
            console.log('response',response);
            this.renderSkillsList(response.skills);
            this.renderHobbies(response.hobbies);
            this.renderExperience(response.experience);
            this.renderProjects(response.projects);
        }

        init(){
            this.fetchData();
        }

    }

    const userFolio = new Portfolio();
    userFolio.init();

} catch (error) {
    console.log('Error occured', error);
}