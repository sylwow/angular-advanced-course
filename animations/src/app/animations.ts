import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations'

export const fadeIn = animation([
    style({ opacity: 0 }),
    animate('{{delay}}', style({ opacity: 1 })),
], {
    params: {
        delay: '1000ms'
    }
});

export const fadeOut = animation([
    animate('{{delay}}', style({ opacity: 0 })),
]);

export const fadeInOut = trigger('fadeInOut', [
    transition('void => *', useAnimation(fadeIn)),
    transition('* => void', useAnimation(fadeOut), {
        params: {
            delay: '200ms'
        }
    })
])