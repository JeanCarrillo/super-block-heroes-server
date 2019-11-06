import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Monster {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 25}) 
    name:string;

    @Column()
    hp:number;

    @Column({length: 25}) 
    background:string;

    @Column()
    speed:number;

    @Column("simple-json") 
    sprites: 
    {   
        name: string,
        hp: number,
        background: number,
        speed: number,
        time_min: number,
        time_max: number,
        sprites: 
            {
                width:number, 
                height:number,
                moving: 
                    {
                        y:number,
                        xMin:number,
                        xMax:number
                    },
                attacking:
                {
                    y:number,
                    xMin:number,
                    xMax:number
                }
            },
       };

    @Column()
    time_min:number;

    @Column()
    time_max:number;

    @Column('date') 
    created_at:Date;

    @Column('date') 
    updated_at:Date;
}