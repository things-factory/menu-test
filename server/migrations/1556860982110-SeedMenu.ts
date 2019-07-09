import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Menu } from '@things-factory/menu-base'
import { MENUS as SEED_MENUS } from '../seed-data/menus'

export class SeedMenu1556860982110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Menu)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      SEED_MENUS.forEach(async menus => {
        const groupMenu = { ...menus }
        delete groupMenu.childrens

        const parent = await repository.save({ ...groupMenu, domain })

        menus.childrens.forEach(async menu => {
          await repository.save({
            ...menu,
            domain,
            parent
          })
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(Menu)

    SEED_MENUS.reverse().forEach(async menu => {
      let record = await repository.findOne({ name: menu.name })
      await repository.remove(record)
    })
  }
}
