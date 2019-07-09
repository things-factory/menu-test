import { MigrationInterface, QueryRunner, getRepository } from 'typeorm'
import { Domain } from '@things-factory/shell'
import { Menu, MenuColumn } from '@things-factory/menu-base'
import { MENU_COLUMNS as SEED_MENU_COLUMNS } from '../seed-data/menu-columns'

export class SeedMenuColumn1557923635449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const repository = getRepository(MenuColumn)
    const menuRepository = getRepository(Menu)
    const domainRepository = getRepository(Domain)
    const domain = await domainRepository.findOne({ name: 'SYSTEM' })

    try {
      SEED_MENU_COLUMNS.forEach(async menuColumn => {
        const menu = await menuRepository.findOne({
          domain,
          name: menuColumn.menuName
        })

        await repository.save({
          ...menuColumn,
          domain,
          menu
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // TODO
  }
}
