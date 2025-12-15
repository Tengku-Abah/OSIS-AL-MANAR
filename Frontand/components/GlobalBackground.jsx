"use client";

import React, { useEffect, useRef } from 'react';

export function GlobalBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let particles = [];
        const particleCount = 100; // Balanced for Mobile/Desktop

        // Mouse/Touch state
        const input = {
            x: null,
            y: null,
            radius: 200, // Interaction radius
            isIdle: true,
            lastInputTime: 0
        };

        // Input Handlers
        const handleMove = (x, y) => {
            input.x = x;
            input.y = y;
            input.isIdle = false;
            input.lastInputTime = Date.now();
        };

        const onMouseMove = (e) => handleMove(e.x, e.y);
        const onTouchMove = (e) => {
            if (e.touches.length > 0) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchstart', onTouchMove);

        // Check for idle state to engage Ghost Cursor
        setInterval(() => {
            if (Date.now() - input.lastInputTime > 3000) {
                input.isIdle = true;
            }
        }, 1000);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.size = Math.random() * 3;
                this.baseColor = Math.random() > 0.5 ? '255, 215, 0' : '100, 255, 218';
                this.color = `rgba(${this.baseColor}, `;
                this.alpha = Math.random() * 0.7 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';

                ctx.shadowBlur = 15;
                ctx.shadowColor = `rgb(${this.baseColor})`;

                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        init();

        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.01;

            // Determine Target Coordinates (User Input OR Ghost Cursor)
            let targetX = input.x;
            let targetY = input.y;

            if (input.isIdle) {
                // Lissajous curve for smooth auto-wandering
                targetX = (canvas.width / 2) + Math.cos(time * 0.5) * (canvas.width / 3);
                targetY = (canvas.height / 2) + Math.sin(time * 0.7) * (canvas.height / 3);
            }

            // Draw connections first
            connect(targetX, targetY);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const connect = (targetX, targetY) => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                // Inter-particle connections
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) +
                        ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));

                    if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                        opacityValue = 1 - (distance / 20000);
                        if (opacityValue > 0) {
                            ctx.strokeStyle = 'rgba(255, 255, 255,' + (opacityValue * 0.1) + ')';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }

                // Connection to Target (Cursor/Ghost)
                if (targetX && targetY) {
                    let dx = targetX - particles[a].x;
                    let dy = targetY - particles[a].y;
                    let distance = (dx * dx) + (dy * dy);

                    if (distance < (input.radius * input.radius)) {
                        let opacity = 1 - (distance / (input.radius * input.radius));

                        ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.6})`; // Gold
                        ctx.lineWidth = 1.0;

                        ctx.shadowBlur = 5;
                        ctx.shadowColor = 'rgba(255, 215, 0, 1)';

                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(targetX, targetY);
                        ctx.stroke();

                        ctx.shadowBlur = 0;
                    }
                }
            }
        }

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchstart', onTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-deep-navy">
            <div className="absolute inset-0 bg-deep-navy" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(17,34,64,0.4),_rgba(2,12,27,0.8))]" />
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        </div>
    );
}
